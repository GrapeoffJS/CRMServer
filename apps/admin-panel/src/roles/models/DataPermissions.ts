export type DataPermissions = {
    forPupil: {
        phone?: 1 | undefined;
        parentPhone?: 1 | undefined;
        parentNSM?: 1 | undefined;
        balance?: 1 | undefined;
        discord?: 1 | undefined;
        paymentHistory?: 1 | undefined;
        groupsHistory?: 1 | undefined;
        groups?: 1 | undefined;
        tutors?: 1 | undefined;
        localSchedule?: 1 | undefined;
    };
    forGroup: {
        GROUP_NAME?: 1 | undefined;
        TUTOR?: 1 | undefined;
        LEVEL?: 1 | undefined;
        PUPILS?: 1 | undefined;
        PLACES?: 1 | undefined;
        GLOBAL_SCHEDULE?: 1 | undefined;
    };
};
