import React, {useState} from "react";
import {Button} from "antd";
import {connect} from "react-redux";
import {free_day_for_teacher} from "../../../actions";

const TrialLessonScheduleButton_delete = ({setFnc, free_day_for_teacher}) => {
    const [loading, setLoading] = useState(false)
    return (
        <Button
            danger
            loading={loading}
            onClick={() => setFnc(setLoading, free_day_for_teacher)}
        >
            Удалить
        </Button>
    )
}

const mapDispatchToProps = {
    free_day_for_teacher
}

export default connect(() => ({}), mapDispatchToProps)(TrialLessonScheduleButton_delete)