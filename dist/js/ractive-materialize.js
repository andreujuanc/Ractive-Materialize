(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('ractive')) :
	typeof define === 'function' && define.amd ? define(['ractive'], factory) :
	(factory(global.Ractive));
}(this, (function (Ractive) { 'use strict';

Ractive = 'default' in Ractive ? Ractive['default'] : Ractive;

/************************************
 * 				APPBAR
 ***********************************/
Ractive.components.appbar = Ractive.extend({
	isolated: true,
	template:`
		 <nav>
			<div class="nav-wrapper">
				{{yield}}			
			</div>
		</nav>
	`
});

/************************************
 * 			  DROPDOWN
 ***********************************/
Ractive.components.dropdownitem = Ractive.extend({
    isolated: true,
    template: `
            <li {{#divider}} class="divider" {{/divider}} >

                <a 
                    {{#href}}href="{{href}}"{{/href}}
                    on-click="@this.onclick(event)"
                 >
                    {{text}}
                </a>
                
            </li>`,
    onclick: function (event) {
        this.fire('click', event);
        //return false; no need
    }
});
//stoppropagation ??? needed?
Ractive.components.dropdown = Ractive.extend({
    isolated: true,
    template: `
		<a href='#' data-activates='{{id}}' stoppropagation="true">
            <i class="material-icons">more_vert</i>
        </a>

        <!-- Dropdown Structure -->
        <ul id='{{id}}' class='dropdown-content'>
            {{yield}}
        </ul>
	`,
    oninit: function () {
        if (typeof this.get('id') === 'undefined' || this.get('id') === null) {
            this.set('id', 'chk' + Date.now().toString());
        }
    },
    onrender: function () {
        //window.test = this;
        var belowOrigin = this.get('beloworigin');
        var constrain_width = this.get('constrainwidth');
        $(this.find('*')).dropdown({
            belowOrigin: belowOrigin,
            constrain_width: constrain_width
        });
    }
});

/************************************
 * 			AUTOCOMPLETE
 ***********************************/
Ractive.components.autocomplete = Ractive.extend({
    isolated: true,
    template: `
        <div class="input-field">
		 <input type="text" id="{{id}}" class="autocomplete" on-keyup="valuechange">
         <label for="{{id}}">Add Item</label>
        </div>
    	`,
    data: function () {
        return {
            items: null
        };
    },
    oninit: function () {

    },
    itemschanged: function () {
        console.log('items changed', this.get('items'));
        $(this.find('input')).autocomplete({
            data: this.get('items')
        });
    },
    valuechange: function (event) {
        this.fire('autoneeddata', event.original.target.value);
    },
    onrender: function () {
        this.observe('items', this.itemschanged);
        this.on('valuechange', this.valuechange);
    }
});

/************************************
 * 			  CHECKBOX
 ***********************************/
Ractive.components.checkbox = Ractive.extend({
	isolated: true,
	template:`
            <input type="checkbox" id="{{id}}" {{#checked}}checked{{/checked}} on-change="checkedchanged" />
            <label for="{{id}}" ></label>
            `,
    oninit: function(){
        this.on('checkedchanged', this.checkedchanged);
    },
    onrender:function(){
        if(typeof this.get('id') === 'undefined' || this.get('id') === null ){
            this.set('id', 'chk'+Date.now().toString());
        }
    },
    data: function(){
        return {
            checked:false
        };
    },
    checkedchanged: function(event){
        var e = event;
        if(event.original)
            e = event.original;
        this.set('checked', e.target.checked);
    },

});

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
    // onupdate: function(){

    // },
    // onchange: function(){
    //     $(this.find('select')).material_select();
    // },
    // oncomplete: function(){
    //    //$(this.find('select')).material_select();
    // },
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

/************************************
 * 				MODAL
 ***********************************/
Ractive.components.modalcontent = Ractive.extend({
    isolated: true,
    template: `
                <div class="modal-content">
                    <h5>{{title}}</h5>
                    {{yield}}
                </div>
	`
});

Ractive.components.modalfooter = Ractive.extend({
    isolated: true,
    template: `
                <div class="modal-footer">
                    {{yield}}
                </div>
	`
});

Ractive.components.modal = Ractive.extend({
    isolated: true,
    template: `
		 <div  id="{{id}}" 
                class="modal 
                        {{#if type==='bottom'}}bottom-sheet{{/if}}"
                        {{#size}}style="max-height:{{size}}"{{/size}} 
            >
                {{yield}}
          </div>
	`,
    onrender: function () {
        if(!this.get('id')){
            console.error("Modal Component cannot work without id.");
            return;
        }

        $('#'+this.get('id')).modal({
            dismissible: true, // Modal can be dismissed by clicking outside of the modal
            // opacity: .5, // Opacity of modal background
            // in_duration: 300, // Transition in duration
            // out_duration: 200, // Transition out duration
            // starting_top: '4%', // Starting top style attribute
            // ending_top: '10%', // Ending top style attribute
            // ready: function (modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
            //    // alert("Ready");
            //     console.log(modal, trigger);
            // },
            // complete: function () { alert('Closed'); } // Callback for Modal close
        });
    }
});

/************************************
 * 			  PRELOADER
 ***********************************/
Ractive.components.preloader = Ractive.extend({
	isolated: true,
	template:`
            <div class="preloader-wrapper {{size}} active">
                <div class="spinner-layer spinner-{{color}}-only">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div>
                    <div class="gap-patch">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
            `,
    oninit: function(){
        
    },
    onrender:function(){
    },
    data: function(){
        return {
            
        };
    }
});



})));

