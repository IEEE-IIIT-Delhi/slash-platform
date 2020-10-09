export const ANSWER_REGEX = /^[a-zA-Z0-9_]*$/
export const USERNAME_LENGTH_REGEX = /^.{2,15}$/

// Response success
export const CORRECT_ANS = 'Correct answer'
export const GENERIC_SUCC = 'Successful request'
export const SUCCESSFUL_REGISTRATION = 'Account created. You may login now.'

// Response failure
export const ERR_NOAUTH = 'Request unauthenticated'
export const ERR_INVALID_ANS = 'Only alphanumeric inputs are allowed. Further invalid attempts will lead to disqualification.'
export const ERR_WRONG_ANS = 'Wrong answer'
export const ERR_MISC = 'An error occured while processing the query'
export const ERR_NO_PLAYER = 'Player with requested ID not found'
export const ERR_NO_QUESTION = 'Question could not be found'
export const ERR_LEVEL_EXISTS = 'Question for specified level exists'
export const ERR_INVALID_CREDS = 'Wrong username or password'
export const ERR_INVALID_EMAIL_USERNAME = 'Invalid email or username'
export const ERR_USERNAME_EXISTS = 'Username taken'
export const ERR_EMAIL_EXISTS = 'Email is already in use. Please try another email or login using existing account'
export const ERR_PLAYER_DQ = 'You have been disqualified'
export const HUNT_END = 'The hunt has ended'
