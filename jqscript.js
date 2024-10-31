$(document).ready(function () {
    const scheduleUrl = 'https://api.npoint.io/36202f5431b58775e4fa';

    function getClassesForDay(scheduleData, day) {
        return scheduleData.filter(classInfo => classInfo.days.includes(day));
    }

    const blockOrder = {
        A: [1, 2, 3, 5, 6],
        B: [4, 1, 2, 7, 5],
        C: [3, 4, 1, 6, 7],
        D: [2, 3, 4, 5, 6],
        E: [1, 2, 3, 7, 5],
        F: [4, 1, 2, 6, 7],
        G: [3, 4, 7, 5, 6]
    };

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
                const orderedSchedule = blockOrder[dayInput].map(period => {
                    return daySchedule.find(classInfo => classInfo.period === period);
                });

                $('#scheduleList').empty();

                if (orderedSchedule.length > 0) {
                    orderedSchedule.forEach(classInfo => {
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