class FrontNavHeaderController {
  constructor ($rootScope, ContextService, $location, $state) {
    'ngInject'

    let navHeader = this
    this.$location = $location
    this.$state = $state
  }

  $onInit () {
  	document.getElementById('mobile_menu').style.display = 'none';
  	document.getElementById('toggle_menu_bg').style.display = 'none';
  }

  toggleMenu () {
  	if (document.getElementById('mobile_menu').style.display == '' || document.getElementById('mobile_menu').style.display == 'none')
    {	
    	document.getElementById('mobile_menu').style.display = 'block';
    	document.getElementById('toggle_menu_bg').style.display = 'block';
    } else {
    	document.getElementById('mobile_menu').style.display = 'none';
    	document.getElementById('toggle_menu_bg').style.display = 'none';
    }
  }

  toSection (section) {
    this.$state.go('front.home');
    this.$location.hash(section);
  }
}

export const FrontNavHeaderComponent = {
  templateUrl: './views/app/components/front-nav-header/front-nav-header.component.html',
  controller: FrontNavHeaderController,
  controllerAs: 'vm',
  bindings: {}
}
