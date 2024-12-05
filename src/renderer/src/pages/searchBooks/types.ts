export interface Book {
    author: string;
    book_id: string;
    book_name: string;
    hold_num: number;
    borrow_num: number;
    publisher: string;
}

export interface BookDetailProps {
    bookDetail: BookDetailType;
    isOpen: boolean;
    setIsOpen: Function;
}

export interface BookDetailType {
    author: string;
    book_id: string;
    book_name: string;
    description: string;
    hold_num: number;
    borrow_num: number;
    publisher: string;
    publish_date: string;
    hold_books: Array<any>;
    isbn: string;
    remain_num: number;
}
