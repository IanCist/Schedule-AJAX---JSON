$(document).ready(function () {
    const scheduleUrl = 'https://api.npoint.io/33c72f997a77579e3435';

    function getClassesForDay(scheduleData, day) {
        return scheduleData.filter(classInfo => classInfo.days.includes(day));
    }

    $('#submitDay').on('click', function () {
        const dayInput = $('#dayInput').val().toUpperCase();
        if

        $.ajax({
            url: scheduleUrl,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                const daySchedule = getClassesForDay(data.schedule, dayInput);

                $('#scheduleList').empty();

                if (daySchedule.length > 0) {
                    daySchedule.forEach(classInfo => {
                        const row = `
                        <tr>
                            <td>${classInfo.period}</td>
                            <td>${classInfo.time}</td>
                            <td>${classInfo.name}</td>
                            <td>${classInfo.teacher}</td>
                            <td>${classInfo.room}</td>
                        </tr>`;
                        $('#scheduleList').append(row);
                    });
                }
            }
        });
    });
});