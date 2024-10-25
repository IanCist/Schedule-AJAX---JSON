$(document).ready(function () {
    const scheduleUrl = 'https://api.npoint.io/33c72f997a77579e3435';

    function getClassesForDay(scheduleData, day) {
        return scheduleData.filter(classInfo => classInfo.days.includes(day));
    }

    $('#submitDay').on('click', function() {
        const dayInput = $('#dayInput').val().toUpperCase();
        if

        $.ajax({
            url: scheduleUrl,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
const daySchedule = getClassesForDay(data.schedule, dayInput);
            }
        });
    });
});