export const HTTP_ERRORS = {
    USER_WITH_SAME_LOGIN_EXISTS: 'User with the same login exists'
};

export const CREATE_USER_ERRORS = {
    WRONG_LOGIN: '`login` is empty or too long',
    WRONG_PASSWORD: '`password` is empty or too long',
    WRONG_NAME: '`name` is empty or too long',
    WRONG_SURNAME: '`surname` is empty or too long',
    WRONG_MIDNAME: '`midname` is empty or too long',
    WRONG_ROLE: `role must be 'admin', 'manager' or 'teacher'`
};
