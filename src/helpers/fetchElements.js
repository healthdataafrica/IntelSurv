import store from "../stores/store";
import { fetchFormElements } from './fetchFormElements';
import { transformElements } from './transformElements';


async function fetchElements(id, maxRetries,setOriginalData, setFilteredData, questionnaireElements) {

    if (questionnaireElements == null) {
        try {
            // ... Your async operations, like fetching data, etc.
            let response = await fetchFormElements(1, 5);
            let data = await response;
            console.log('data', data);
            const transformedData = transformElements(data);
            console.log('transformed', transformedData);
            setOriginalData(transformedData);
            setFilteredData(transformedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }



}
export { fetchElements }