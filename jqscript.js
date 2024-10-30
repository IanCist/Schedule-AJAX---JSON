$(document).ready(function () {
    const scheduleUrl = 'https://api.npoint.io/7837e2b221422e14345a';

    function getClassesForDay(scheduleData, day) {
        return scheduleData.filter(classInfo => classInfo.days.includes(day));
    }

    $('#submitDay').on('click', function () {
        const dayInput = $('#dayInput').val().toUpperCase();
        if (!/^[A-G]$/.test(dayInput)) {
            alert("Please enter a valid day (A-G).");
            return;
        }

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
                            <td>${classInfo.class}</td>
                            <td>${classInfo.teacher}</td>
                            <td>${classInfo.room}</td>
                        </tr>`;
                        $('#scheduleList').append(row);
                    });
                } else {
                    $('#scheduleList').append('<tr><td colspan="5" class="text-center">No classes today</td></tr>');
                }
            },
            error: function () {
                alert("Could not load the schedule. Please try again later.");
            }
        });
    });
});