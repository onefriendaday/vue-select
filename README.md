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
	el: 'body',
	components: {
		select: require('vue-select')
	}
})
```

```
<div v-component="select" 
     v-ref="selectLang" 
     v-with="optionsFromParent: {w: 'Woman', m: 'Men'}"></div>
```

## Example how to use with vue-validator
```
<input type="hidden" v-model="form.country" v-validate="required" lazy>
<div v-component="select" 
     v-ref="formCountry" 
     v-with="isInvalid: validation.form.country.invalid, modelToUpdate: 'form.country' globalKey: 'countries', preselect: 'AT'"></div>

<script type="text/javascript">
	var global = {countries: {'AT': 'Austria', 'US': 'United States'}}
</script>
```

# Todo

* Remove Jquery dependencies
