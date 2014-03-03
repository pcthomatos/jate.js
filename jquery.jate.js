/** @author pcthomatos
  * @license: MIT
 **/
(function(jQuery){//JQuery Plugin##################
	var $this					= undefined,
		_openCloseDelimiters 	= ['{{', '}}'],
	//##################################################################################################################
		_init = function(){
			jQuery.fn.jate = _jate;
		},
	//##################################################################################################################
		_setOptions = function(openCloseDelimiters){
			var openCloseDelimiters = openCloseDelimiters;

			if(openCloseDelimiters.length &&
				openCloseDelimiters.length === 2 &&
				typeof openCloseDelimiters[0] === 'string' &&
				typeof openCloseDelimiters[1] === 'string') _openCloseDelimiters = openCloseDelimiters;
		},
	//##################################################################################################################
		_process = function(collection){
			var collection 	= collection,
				tempalteStr = $this.html().replace(/%7B%7B/g, '{{').replace(/%7D%7D/g, '}}').replace(/\sprocessedYes/g, ''),
				openDmtr	=  _openCloseDelimiters[0],
				closeDmtr 	=  _openCloseDelimiters[1],
	 			collectionLength, i, j;

			if(!collection.length){
				for(i in collection) tempalteStr = tempalteStr.replace(new RegExp(openDmtr + i + closeDmtr, 'g'), collection[i]);
			}else{
				collectionLength = collection.length;
				for(i = 0; i < collectionLength; i+=1)
					for(j in collection[i])
						tempalteStr = tempalteStr.replace(new RegExp(openDmtr + j + closeDmtr, 'g'), collection[i][j]);
			}

			$this.html(tempalteStr);
		},
	//##################################################################################################################
		_compile = function(optionsOrObjectArrOrObj){
			var collection 	= optionsOrObjectArrOrObj;

			if(collection.hasOwnProperty('openCloseDelimiters')) return _setOptions(collection.openCloseDelimiters);

			(/^\[object Array]|\[object Object]$/).test(Object.prototype.toString.call(collection)) &&
				(!collection.length || collection.length && typeof collection[0] === 'object')?
					_process(collection)
						: $this.html('Error: Invalid jate.jquery.js params. Expecting Object or Array of Objects.');
		},
	//##################################################################################################################
		_jate = function(optionsOrObjectArrOrObj){
			$this = this;
			_compile(optionsOrObjectArrOrObj);
			return this;
		};
	//##################################################################################################################
	//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
	_init();
}(jQuery));

