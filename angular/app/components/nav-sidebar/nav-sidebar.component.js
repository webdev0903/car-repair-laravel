class NavSidebarController {
  constructor (AclService, ContextService, $state) {
    'ngInject'

    let navSideBar = this
    this.can = AclService.can
    this.$state = $state

    ContextService.me(function (data) {
      navSideBar.userData = data
    })
  }

  $onInit () {
    this.selectedNav = 0
  }

  changeNav (next, index) {
    this.selectedNav = index
    this.$state.go(next)
  }
}

export const NavSidebarComponent = {
  templateUrl: './views/app/components/nav-sidebar/nav-sidebar.component.html',
  controller: NavSidebarController,
  controllerAs: 'vm',
  bindings: {}
}
