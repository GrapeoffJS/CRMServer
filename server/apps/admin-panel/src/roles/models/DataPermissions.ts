export type DataPermissions = {
    forPupil: {
        phone?: 1;
        dateOfBirth?: 1;
        parentPhone?: 1;
        parentFullname?: 1;
        balance?: 1;
        discord?: 1;
        paymentHistory?: 1;
        groupsHistory?: 1;
        groups?: 1;
        tutors?: 1;
        localSchedule?: 1;
        salesFunnelStep?: 1;
        statuses?: 1;
        notes?: 1;
    };
    forGroup: {
        group_name?: 1;
        tutor?: 1;
        level?: 1;
        pupils?: 1;
        places?: 1;
        global_schedule?: 1;
    };
};
