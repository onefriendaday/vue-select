var Vue = require('vue')
var _ = Vue.util

module.exports = {
    template: require('./select.html'),
    data: function() {
        return {
            selectOptions: [],
            optionsFromParent: null,
            url: '',
            path: '',
            globalKey: '',
            localKey: '',
            preselect: null,
            dropdownOpen: false,
            isInvalid: false,
            currentSelection: {
                name: '',
                value: ''
            },
            modelToUpdate: null,
            defaultText: 'Choose',
            term: '',
            showSearch: false,
            enableSearch: false,
            currentIndex: -1,
            currentValue: '',
            map: {value: 'value', name: 'name'},
            outsideClose: true
        }
    },
    computed: {
        filteredOptions: function() {
            var term = this.searchTerm

            return this.selectOptions.filter(function (item) {
                return item.name.toString().toLowerCase().indexOf(term) > -1
            })
        },
        searchTerm: function() {
            return this.term.toString().toLowerCase()
        }
    },
    created: function() {
        var that = this

        this.$watch('url', function () {
            if (this.url.length > 0) {
                $.ajax({
                    url: this.url,
                    type: 'GET',
                    dataType: 'json'
                })
                .done(function(data) {
                    var dataArr = data[that.$data.path]
                    that.setOptions(dataArr)
                })
            }
        })

        this.$watch('globalKey', function () {
            if (this.globalKey.length > 0) {
                this.setOptions(global[this.globalKey])
            }
        })

        this.$watch('localKey', function () {
            if (this.localKey.length > 0) {
                this.setOptions(local[this.localKey])
            }
        })

        this.$watch('optionsFromParent', function () {
            if (this.optionsFromParent !== null) {
                this.setOptions(this.optionsFromParent)
            }
        })
    },
    ready: function() {
        if (!this.currentSelection.name) {
            this.currentSelection.name = this.defaultText
        }

        if (this.preselect) {
            this.setValueByKey(this.preselect)
        }

        if (this.outsideClose) {
            var that = this
            $('html').on('click', function(e) {
                if (!$(that.$el).find('.select__btn').is(e.target)) {
                    that.dropdownOpen = false
                    that.showSearch = false
                }
            })
        }
    },
    methods: {
        open: function(e) {
            if (typeof e !== 'undefined') {
                e.preventDefault()
            }

            this.dropdownOpen = !this.dropdownOpen

            if (this.enableSearch) {
                this.showSearch = !this.showSearch
                this.term = ''
                $(this.$el).find('input').focus()
            }
        },
        setOptions: function(options) {
            var opts = []

            if (_.isObject(options) && !_.isArray(options)) {
                for (i in options) {
                    opts.push({value: i, name: options[i]})
                }
            } else {
                for (var i = 0; i < options.length; i++) {
                    opts.push({value: options[i][this.map.value], name: options[i][this.map.name], params: options[i], index: i})
                }
            }

            this.selectOptions = opts
        },
        setOption: function(option) {
            this.currentSelection = option
            this.currentValue = option.value
        },
        setValueByKey: function(key) {
            for (var i = 0; i < this.selectOptions.length; i++) {
                if (this.selectOptions[i].value == key) {
                    this.setOption(this.selectOptions[i])

                    if (this.modelToUpdate) {
                        this.$parent.$set(this.modelToUpdate, this.currentSelection.value)
                    }
                }
            }
        },
        setValue: function(option, e) {
            e.preventDefault()

            this.setOption(option)
            this.dropdownOpen = false

            if (this.enableSearch) {
                this.showSearch = false
            }

            if (this.modelToUpdate) {
                this.$parent.$set(this.modelToUpdate, option.value)
            }

            this.$emit('change', this.currentSelection)
        },
        choose: function(e) {
            this.setValue(this.filteredOptions[this.currentIndex], e)
        },
        goUp: function(e) {
            e.preventDefault()

            if (this.currentIndex > 0) {
                this.currentIndex = this.currentIndex - 1
                this.currentValue = this.filteredOptions[this.currentIndex].value
            }
        },
        goDown: function(e) {
            e.preventDefault()

            if (this.currentIndex >= this.filteredOptions.length - 1) {
                this.currentIndex = this.filteredOptions.length - 1
            } else if (this.currentIndex >= -1) {
                this.currentIndex = this.currentIndex + 1
                this.currentValue = this.filteredOptions[this.currentIndex].value
            }
        }
    }
}