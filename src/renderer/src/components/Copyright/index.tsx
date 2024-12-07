import styles from './index.module.scss';

function Copyright() {
    return (
        <div className={styles.container}>
            <div className="upper">
                <svg class="icon" aria-hidden="true">
                    <use xlinkHref="#icon-banquan"></use>
                </svg>
                &nbsp;2016-{new Date().getFullYear()}&nbsp;蓝山工作室
            </div>
            <div className="bottom">All rights reserved</div>
        </div>
    );
}

export default Copyright;
