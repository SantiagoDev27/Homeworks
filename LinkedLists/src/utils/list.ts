// 1. Singly Linked List (Songs)
export class SongNode {
    title: string;
    next: SongNode | null;

    constructor(title: string, next: SongNode | null = null
        
    ) {
        this.title = title;
        this.next = next;
    }
}

export const getMockedSongs = (): SongNode => {
    const song1 = new SongNode("Music Sounds Better With You - Stardust");
    const song2 = new SongNode("Your Love - Frankie Knuckles");
    const song3 = new SongNode("Lady (Hear Me Tonight) - Modjo");
    const song4 = new SongNode("Show Me Love - Robin S.");

    song1.next = song2;
    song2.next = song3;
    song3.next = song4;

    return song1;
};

// 2. Doubly Linked List (Browser History)
export class PageNode {
    url: string;
    prev: PageNode | null;
    next: PageNode | null;

    constructor(url: string, prev: PageNode | null = null, next: PageNode | null = null) {
        this.url = url;
        this.prev = prev;
        this.next = next;
    }
}

export const getMockedHistory = (): PageNode => {
    const page1 = new PageNode("https://github.com");
    const page2 = new PageNode("https://react.dev");
    const page3 = new PageNode("https://vitejs.dev");

    page1.next = page2;
    page2.prev = page1;
    page2.next = page3;
    page3.prev = page2;

    return page2;
};