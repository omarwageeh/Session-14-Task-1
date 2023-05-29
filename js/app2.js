
var model = {
    attendance: [
        {
            name: 'Slappy the Frog',
            days: [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1]
        },
        {
            name: 'Lilly the Lizard',
            days: [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1]
        },
        {
            name: 'Paulrus the Walrus',
            days: [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1]
        },
        {
            name: 'Gregory the Goat',
            days: [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1]
        },
        {
            name: 'Adam the Anaconda',
            days: [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1]
        }
    ]
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
        this.$allCheckboxes.on('click', this.checkClick);
        this.fillBoxes();
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
        var attendance = controller.getAttendance();
        $('tbody > .student').each(function (j) {
            studentName = $(this).children('.name-col').text(attendance[j].name);
            dayChecks = $(this).children('.attend-col').children('input');

            dayChecks.each(function (i) {
                $(this).prop('checked', attendance[j].days[i]);
            });
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
    }
}


view.init();

