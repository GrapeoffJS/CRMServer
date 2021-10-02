export type DataPermissions = {
    forPupil: {
        phone?: 1 | undefined;
        dateOfBirth: 1 | undefined;
        parentPhone?: 1 | undefined;
        parentFullname?: 1 | undefined;
        balance?: 1 | undefined;
        discord?: 1 | undefined;
        paymentHistory?: 1 | undefined;
        groupsHistory?: 1 | undefined;
        groups?: 1 | undefined;
        tutors?: 1 | undefined;
        localSchedule?: 1 | undefined;
        salesFunnelStep?: 1 | undefined;
        statuses?: 1 | undefined;
    };
    forGroup: {
        group_name?: 1 | undefined;
        tutor?: 1 | undefined;
        level?: 1 | undefined;
        pupils?: 1 | undefined;
        places?: 1 | undefined;
        global_schedule?: 1 | undefined;
    };
};
