

export namespace route {
  export interface User {
    gender?: string;
    name?: {
      first?: string;
      last?: string;
    };
    email?: string;
    picture?: {
      thumbnail?: string;
    };
  }
}

export namespace redux {
  export interface User {
    users?: route.User[];
    user?: route.User | null;
  }
}