import commonAPI from "./commonAPI"
import SERVERURL from "./serverURL"

//SAVEVIDEOAPI - POST HTTP METHOD,IN ADD.JS

export const saveVideoAPI = async (videoDetails) => {
    return await commonAPI(`POST`, `${SERVERURL}/uploadVideos`, videoDetails)
}

//GET ALLVIDEOAPI -GET METHOD ,CALLED VIEW COMPONENT ,WHEN COMPONENT DISPLAYES IN BROWSER INSIDE IT'S USEEFFECT HOOK

export const getAllVideosAPI = async () => {
    return await commonAPI(`GET`, `${SERVERURL}/uploadVideos`, "")
}

//SaveHistoryapi -post to /history called by video card when we click on video
export const saveHistoryAPI = async (historyDetails) => {
    return await commonAPI(`POST`, `${SERVERURL}/history`, historyDetails)
}

//getAllHistoryAPI -GET req to  /history called by history component when it open in browser
export const getAllHistoryAPI = async () => {
    return await commonAPI(`GET`, `${SERVERURL}/history`, "")
}

//DELETEHistoryAPI -DELETE method  /history/id called by history when clicked on delete button
export const deleteHistoryAPI = async (id) => {
    return await commonAPI(`DELETE`, `${SERVERURL}/history/${id}`, {})
}

export const removeVideoAPI = async (id) => {
    return await commonAPI(`DELETE`, `${SERVERURL}/uploadVideos/${id}`, {})
}


export const saveCategoryAPI = async (categoryDetails) => {
    return await commonAPI(`POST`, `${SERVERURL}/categories`, categoryDetails)
}


export const getAllCategoryAPI = async () => {
    return await commonAPI(`GET`, `${SERVERURL}/categories`,{})
}

//deleteCategoryAPI - delete method to /categories/id called by category component when delete button is clicked

export const deleteCategoryAPI = async (id) => {
    return await commonAPI(`DELETE`, `${SERVERURL}/categories/${id}`, {})
}

//updateCategoryAPI put method to /categories/id called by category when video over the category

export const updateCategoryAPI = async (categoryDetails) => {
    return await commonAPI(`PUT`, `${SERVERURL}/categories/${categoryDetails.id}`,categoryDetails)
}



























