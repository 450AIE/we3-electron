import { Modal } from 'antd';
import { BookDetailProps } from '../../types';
import styles from './index.module.scss';

function BookDetail({ bookDetail, isOpen, setIsOpen }: BookDetailProps) {
    console.log('enter', bookDetail);
    if (!bookDetail) return;
    return (
        <Modal
            open={isOpen}
            centered
            getContainer={false}
            onCancel={() => setIsOpen(false)}
            footer={null}
            closable={false}
        >
            <ul className={styles.container}>
                <li className="book-name">{bookDetail.book_name}</li>
                <li className="book-author">{bookDetail.author}</li>
                <li className="book-isbn">ISBN: {bookDetail.isbn}</li>
                <li className="book-introduce">
                    <div>简介</div>
                    <div className="book-introduce-content">{bookDetail.description}</div>
                </li>
                <li className="book-num">
                    <span>剩余本数</span>
                    <span>
                        {bookDetail.remain_num}/{bookDetail.hold_num}
                    </span>
                </li>
                <li className="book-publisher">{bookDetail.publisher}</li>
            </ul>
        </Modal>
    );
}

export default BookDetail;
