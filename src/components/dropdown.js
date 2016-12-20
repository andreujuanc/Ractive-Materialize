/************************************
 * 			  DROPDOWN
 ***********************************/
import Ractive from 'ractive';

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
        var constrain_width = this.get('constrainwidth')
        $(this.find('*')).dropdown({
            belowOrigin: belowOrigin,
            constrain_width: constrain_width
        });
    }
});