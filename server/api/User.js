const express = require('express');
const router = express.Router();

// mongodb user model
const User = require('./../models/User');

// Password handler
const bcrypt = require('bcryptjs');

// Signup
router.post('/signup', (req, res) => {
  let { name, email, password, dateOfBirth } = req.body;
  name = name.trim();
  email = email.trim();
  password = password.trim();
  dateOfBirth = dateOfBirth.trim();

  if (name == '' || email == '' || password == '' || dateOfBirth == '') {
    res.json({
      status: 'FAILED',
      message: 'Empty input fields!',
    });
  } else if (!/^[a-zA-Z\s'-]+$/.test(name)) {
    res.json({
      status: 'FAILED',
      message: 'Invalid name entered',
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.json({
      status: 'FAILED',
      message: 'Invalid email entered',
    });
  } else if (!new Date(dateOfBirth).getTime()) {
    res.json({
      status: 'FAILED',
      message: 'Invalid date of birth entered',
    });
  } else if (password.length < 8) {
    res.json({
      status: 'FAILED',
      message: 'Password is too short!',
    });
  } else {
    // check if user already exists
    User.find({ email })
      .then((result) => {
        if (result.length) {
          // A user already exists
          res.json({
            status: 'FAILED',
            message: 'User with the provided email already exists',
          });
        } else {
          // create new user

          //password handling
          const saltRounds = 10;
          bcrypt
            .hash(password, saltRounds)
            .then((hashedPassword) => {
              const newUser = new User({
                name,
                email,
                password: hashedPassword,
                dateOfBirth,
              });

              newUser
                .save()
                .then((result) => {
                  res.json({
                    status: 'SUCCESS',
                    message: 'Signup successful',
                    data: result,
                  });
                })
                .catch((err) =>
                  res.json({
                    status: 'FAILED',
                    message: 'An error occured while saving user account!',
                  })
                );
            })
            .catch((err) => {
              res.json({
                status: 'FAILED',
                message: 'An error occured while hashing password!',
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: 'FAILED',
          message: 'An error occured while checking for existing user!',
        });
      });
  }
});

// Login
router.post('/login', (req, res) => {
  console.log('login request recieved', req.body);
  let { email, password } = req.body;
  email = email.trim();
  password = password.trim();

  if (email == '' || password == '') {
    res.json({
      status: 'FAILED',
      message: 'Empty credentials supplied',
    });
  } else {
    // check if user already exists
    User.find({ email })
      .then((data) => {
        if (data.length) {
          // User exists
          const hashedPassword = data[0].password;
          bcrypt
            .compare(password, hashedPassword)
            .then((result) => {
              if (result) {
                // Password match
                res.json({
                  status: 'SUCCESS',
                  message: 'Login successful',
                  data: data,
                });
              } else {
                res.json({
                  status: 'FAILED',
                  message: 'Invalid password entered',
                });
              }
            })
            .catch((err) => {
              res.json({
                status: 'FAILED',
                message: 'An error occured while comparing passwords',
              });
            });
        } else {
          res.json({
            status: 'FAILED',
            message: 'Invalid credentials entered!',
          });
        }
      })
      .catch((err) => {
        res.json({
          status: 'FAILED',
          message: 'An error occured while checking for existing user',
        });
      });
  }
});

// leaderboard route
// Get leaderboard - users sorted by score
router.get('/leaderboard', async (req, res) => {
  try {
    // Fetch users from the database and sort by the score in descending order
    const users = await User.find({})
      .sort({ score: -1 }) // Ensure the sorting uses the proper score field
      .select('name score'); // Select only the fields you need

    // Ensure that all users have a score, defaulting to 0 if it's missing
    const updatedUsers = users.map((user) => ({
      ...user.toObject(),
      score: user.score ?? 0, // Assign 0 if the score is missing
    }));

    console.log('Updated Users', updatedUsers); // You can see the updated users list in the console

    res.json({
      status: 'SUCCESS',
      message: 'Leaderboard fetched successfully',
      data: updatedUsers,
    });
  } catch (err) {
    console.log('Leaderboard fetch error:', err);
    res.status(500).json({
      status: 'FAILED',
      message: 'Error fetching leaderboard',
    });
  }
});

module.exports = router;
