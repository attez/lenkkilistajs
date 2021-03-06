/** Vue filter for date formatting.
 * 
 * @ param value {string | firebase.firestore.Timestamp } Input date.
 * @ return {string} Date string in fi-FI locale.
 *
*/
import * as firebase from 'firebase/app'
import 'firebase/firestore'
export default (value) => {
    // try to parse value if is not Date
    if(typeof value === 'string' || value instanceof String) {
        value = Date.parse(value)
        if (!value) {
            return ''
        }

    }
    else if (value instanceof firebase.firestore.Timestamp){
        value = value.toDate()
    }
    return value.toLocaleString('fi-FI')
}