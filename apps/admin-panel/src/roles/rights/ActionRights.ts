export enum ActionRights {
    CAN_CREATE_STUDENT = 'crm:student:create',
    CAN_EDIT_STUDENT = 'crm:student:update',
    CAN_DELETE_STUDENT = 'crm:student:delete',
    CAN_SEE_STUDENT = 'crm:student:read',
    CAN_CREATE_STUDENT_NOTE = 'crm:student:notes:create',
    CAN_EDIT_STUDENT_NOTE = 'crm:student:notes:update',
    CAN_DELETE_STUDENT_NOTE = 'crm:student:notes:delete',
    CAN_IMPORT_STUDENTS_VIA_FILE = 'crm:student:import',
    CAN_CREATE_STUDENT_STATUS = 'crm:student:statuses:create',
    CAN_SEE_STUDENT_STATUSES = 'crm:student:statuses:read',
    CAN_EDIT_STUDENT_STATUS = 'crm:student:statuses:update',
    CAN_DELETE_STUDENT_STATUS = 'crm:student:statuses:delete',
    CAN_CREATE_GROUP = 'crm:group:create',
    CAN_EDIT_GROUP = 'crm:group:update',
    CAN_DELETE_GROUP = 'crm:group:delete',
    CAN_SEE_GROUP = 'crm:group:read',
    CAN_USE_SEARCH = 'crm:search:read'
}
