/************************************
 * 			  DROPDOWN
 ***********************************/
import Ractive from 'ractive';

Ractive.components.checkbox = Ractive.extend({
	isolated: true,
	template:`
            <input type="checkbox" id="{{id}}" />
            <label for="{{id}}" stopPropagation></label>
            `,
    onrender:function(){
        if(typeof this.get('id') === 'undefined' || this.get('id') === null ){
            this.get('id', 'chk'+Date.now().toString());
        }
    }
});