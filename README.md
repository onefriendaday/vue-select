# vue-select
Vue JS selectbox replacement with search field. Tries to imitate the functionality of the jquery plugin [select2](https://select2.github.io/examples.html) but with much less code.

## Features

* Compatibility with vue-validator
* Enable or disable search field
* Provide data source from url, parent component or global window variable
* Map names for value and id

# How to use
```
new Vue({
	...
	created: function() {
		this.$.selectLang.setOptions(['English', 'German'])
	},
	components: {
		select: require('./vue-select')
	}
}
})
```

```
<div v-component="select" 
		v-ref="selectLang" 
		v-with="defaultText: 'Choose Your Language', " 
		v-events="change: setLanguage"></div>
```

# Todo

* Remove Jquery dependencies
