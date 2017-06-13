import Ractive from 'ractive';


/************************************
 * 			  COMBOBOX ITEM
 ***********************************/

Ractive.components.comboboxitem = Ractive.extend({
	isolated: true,
	template:'<option selected="{{selected}}" value="{{value}}">{{text}}</option>',
    onrender: function(){
        $(this.parent.find('select')).material_select();
    }
});

/************************************
 * 			  COMBOBOX
 ***********************************/
Ractive.components.combobox = Ractive.extend({
    isolated: true,
    template: `
            <select id="{{id}}" on-change="@this.selectedchanged(event)" value="{{value}}" >
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
        var ctrl = this.find('select');
        $(ctrl).on('change', function(event){ self.selectedchanged(event, self); });
        $(ctrl).material_select();
        this.observe('value', function(a, b, c, d){            
            if(ctrl.value !== a){
               ctrl.value = a;
               self.update();
               $(self.find('select')).material_select();
            }            
        });

        this.observe('dataSource', function(a, b, c, d){         
            console.log('data source changed', arguments)  
            setTimeout(function() {
                //self.update();
                $(self.find('select')).material_select();     
            }, 1);           
        });
    },
    onchange: function(){
        $(this.find('select')).material_select();
    },
    oncomplete: function(){
       //$(this.find('select')).material_select();
    },
    onteardown: function(){
        //TODO: test
        $(this.find('select')).material_select('destroy');
    },
    data: function () {
        return {
            selected: null
        };
    },
    selectedchanged: function (event, self) {
        var e = event;
        if (event.original)
            e = event.original;

        self.set('value', self.find('select').value);
        self.fire('change', event);
        //this.set('value', e.target.value);
    },

});