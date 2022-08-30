// interface IOption {
//   mode: string;
//   root: string;
// }
//
// class Router {
//   public routes: {
//     path: string;
//     cb: {
//       cb: string;
//       apply(param: {}, match: RegExpMatchArray): void;
//     };
//   }[] = [];
//
//   public mode!: string;
//
//   public root: string = '/';
//
//   public current: string = '';
//
//   constructor(options: IOption) {
//     // this.mode = window.history.pushState ? 'history' : 'hash';
//     if (this.mode === 'history') {
//       window.history.pushState(null, '', this.root);
//     } else {
//       window.location.href = `${window.location.href.replace(/\?(.*)$/, '')}#`;
//     }
//
//     if (options.mode) this.mode = options.mode;
//     if (options.root) this.root = options.root;
//
//     this.listen();
//   }
//
//   add({path, cb}: {path: string; cb: {cb: string; apply(param: {}, match: RegExpMatchArray): void}}) {
//     this.routes.push({
//       path,
//       cb,
//     });
//
//     return this;
//   }
//
//   remove(path: string) {
//     for (let i: number = 0; i < this.routes.length; i++) {
//       if (this.routes[i].path === path) {
//         this.routes.splice(i, 1);
//
//         return this;
//       }
//     }
//
//     return this;
//   }
//
//   flush() {
//     this.routes = [];
//
//     return this;
//   }
//
//   removeSlashes(path: string): string {
//     return path.replace(/\/$/, '').replace(/^\//, '');
//   }
//
//   getFragment() {
//     let fragment = '';
//
//     if (this.mode === 'history') {
//       fragment = this.removeSlashes(decodeURI(window.location.pathname + window.location.search));
//       fragment = fragment.replace(/\?(.*)$/, '');
//       fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
//     } else {
//       const match = window.location.href.match(/#(.*)$/);
//
//       fragment = match ? match[1] : '';
//     }
//
//     return this.removeSlashes(fragment);
//   }
//
//   navigate(path: string = '') {
//     if (this.mode === 'history') {
//       window.history.pushState(null, '', this.root + this.removeSlashes(path));
//     } else {
//       window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${path}`;
//     }
//
//     return this;
//   }
//
//   listen() {
//     clearInterval(this.interval as keyof typeof this.interval);
//     (this.interval as unknown) = setInterval(this.interval, 50);
//   }
//
//   interval() {
//     if (this.current === this.getFragment()) return;
//     this.current = this.getFragment();
//
//     this.routes.some((route) => {
//       const match = this.current.match(route.path);
//
//       if (match) {
//         match.shift();
//
//         route.cb.apply({}, match);
//
//         return match;
//       }
//
//       return false;
//     });
//   }
// }
//
// export {Router};
