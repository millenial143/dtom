module.exports = {
	array_compare: function(a, b){
		if(a.length != b.length)
	       return false;

	    for(i = 0; i < a.length; i++)
	       if(a[i] != b[i])
	          return false;

	    return true;
	}
};