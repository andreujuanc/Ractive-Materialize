/************************************
 * 				MODAL
 ***********************************/
import Ractive from 'ractive';

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