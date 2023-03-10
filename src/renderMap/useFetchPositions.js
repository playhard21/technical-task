import {useState, useEffect, useMemo} from "react";

export const useFetchPositions = url => {
    //Avoid cors error while sending request from browser
    const requestOptions = useMemo(() => {
        return {
            method:'GET',
            redirect: 'follow'
        }
    },[url]);

    const [state, setState] = useState({data: null, error: false})
    //assign interval to a variable to clear it.
    useEffect(() => {
        const intervalId = setInterval(() => {
            setState(state => ({data: state.data, error: false}))
            fetch(url,requestOptions)
                .then(data => data.json())
                .then(obj =>
                    Object.keys(obj).map(key => {
                        let newData = obj[key]
                        newData.key = key
                        return newData
                    })
                )
                .then(newData => setState({data: newData, error: false}))
                .catch(function (error) {
                    console.log(error)
                    setState({data: null, error: true})
                })
        }, 500)

        return () => clearInterval(intervalId);

    }, [useState])
    //runs on mount
    useEffect(() => () => console.log('unmount'), [])
    return state
}