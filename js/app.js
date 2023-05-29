(function () {
    if (!model.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var nameColumns = $('tbody .name-col'),
            attendance = {};

        nameColumns.each(function () {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        model.attendance = attendance;
    }
}());

var model = {
    init: function () {
        this.attendance = [
            {
                name: 'Slappy the Frog',
                days: []
            },
            {
                name: 'Lilly the Lizard',
                days: []
            },
            {
                name: 'Paulrus the Walrus',
                days: []
            },
            {
                name: 'Gregory the Goat',
                days: []
            },
            {
                name: 'Adam the Anaconda',
                days: []
            }
        ]
    }
}
var controller = {
    init: function () {

    },
    getAttendance() {
        return model.attendance;
    },
    setAttendace(attendance) {
        model.attendance = attendance;
        view.countMissing();
    }
}
var view = {
    init() {
        this.$allMissed = $('tbody .missed-col');
        this.$allCheckboxes = $('tbody input');
        this.countMissing();
    },
    countMissing() {
        this.$allMissed.each(function () {
            var studentRow = $(this).parent('tr'),
                dayChecks = $(studentRow).children('td').children('input'),
                numMissed = 0;

            dayChecks.each(function () {
                if (!$(this).prop('checked')) {
                    numMissed++;
                }
            });

            $(this).text(numMissed);
        });
    },
    fillBoxes() {
        model.attendance.forEach(function (name, days) {
            $('tbody .student').each(function (studentRow) {
                studentName = $(studentRow).children('.name-col').text(name);
                dayChecks = $(studentRow).children('.attend-col').children('input');

                dayChecks.each(function (i) {
                    $(this).prop('checked', days[i]);
                });
            })

        })
    },
    checkClick() {
        var studentRows = $('tbody .student'),
            newAttendance = {};

        studentRows.each(function () {
            var name = $(this).children('.name-col').text();
            this.$allCheckboxes = $(this).children('td').children('input');

            newAttendance[name] = [];

            this.$allCheckboxes.each(function () {
                newAttendance[name].push($(this).prop('checked'));
            });
        });

        controller.setAttendace(newAttendance);
        localStorage.attendance = JSON.stringify(newAttendance);
    }
}





    /* STUDENTS IGNORE THIS FUNCTION
     * All this does is create an initial
     * attendance record if one is not found
     * within localStorage.
     */
    (function () {
        if (!model.attendance) {
            console.log('Creating attendance records...');
            function getRandom() {
                return (Math.random() >= 0.5);
            }

            var nameColumns = $('tbody .name-col'),
                attendance = {};

            nameColumns.each(function () {
                var name = this.innerText;
                attendance[name] = [];

                for (var i = 0; i <= 11; i++) {
                    attendance[name].push(getRandom());
                }
            });

            model.attendance = attendance;
        }
    }());


/* STUDENT APPLICATION */
$(function () {
    var attendance = JSON.parse(localStorage.attendance),
        $allMissed = $('tbody .missed-col'),
        $allCheckboxes = $('tbody input');

    // Count a student's missed days
    function countMissing() {
        $allMissed.each(function () {
            var studentRow = $(this).parent('tr'),
                dayChecks = $(studentRow).children('td').children('input'),
                numMissed = 0;

            dayChecks.each(function () {
                if (!$(this).prop('checked')) {
                    numMissed++;
                }
            });

            $(this).text(numMissed);
        });
    }

    // Check boxes, based on attendace records
    $.each(attendance, function (name, days) {
        var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
            dayChecks = $(studentRow).children('.attend-col').children('input');

        dayChecks.each(function (i) {
            $(this).prop('checked', days[i]);
        });
    });

    // When a checkbox is clicked, update localStorage
    $allCheckboxes.on('click', function () {
        var studentRows = $('tbody .student'),
            newAttendance = {};

        studentRows.each(function () {
            var name = $(this).children('.name-col').text(),
                $allCheckboxes = $(this).children('td').children('input');

            newAttendance[name] = [];

            $allCheckboxes.each(function () {
                newAttendance[name].push($(this).prop('checked'));
            });
        });

        countMissing();
        localStorage.attendance = JSON.stringify(newAttendance);
    });

    countMissing();
}());
