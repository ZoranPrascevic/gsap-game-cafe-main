import classes from './Preloader.module.css'
import spinner from '../../media/image/tail-spin.svg'

const Preloader = () => {
    return (
        <div className={classes.wrapper}>
            <img src={spinner} alt="loading..." />
        </div>
    )
}

export default Preloader
