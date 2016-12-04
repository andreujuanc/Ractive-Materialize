import Ractive from 'ractive';

/************************************
 * 			  COMBOBOX ITEM
 ***********************************/

Ractive.components.comboboxitem = Ractive.extend({
	isolated: true,
	template:'<option value="{{value}}">{{text}}</option>'
});

/************************************
 * 			  COMBOBOX
 ***********************************/
Ractive.components.combobox = Ractive.extend({
    isolated: true,
    template: `
            <select id="{{id}}" on-change="@this.selectedchanged(event)" value="{{value}}">
                <option value="" disabled selected>{{label}}</option>
                {{yield}}
            </select>
            <label for="{{id}}">{{label}}</label>
            `,
    oninit: function () {
        //this.on('selectedchanged', this.selectedchanged);
    },
    onrender: function () {
        var self = this;
        $(this.find('select')).material_select();
        $(this.find('select')).on('change', function(event){ self.selectedchanged(event, self); });
    },
    onteardown: function(){
        debugger;//TODO: test
        $(this.find('select')).material_select('destroy');
    },
    data: function () {
        return {
            selected: null,
            value:null
        };
    },
    selectedchanged: function (event, self) {
        debugger;
        var e = event;
        if (event.original)
            e = event.original;
        self.set('value', self.find('select').value);
        self.fire('change', event);
        //this.set('value', e.target.value);
    },

});