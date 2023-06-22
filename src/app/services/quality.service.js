import httpService from "./http.services";
const qualityEndpoint = "quality/";

const qualityService = {
    fetchAll: async () => {
        const { data } = await httpService.get(qualityEndpoint);
        return data;
    }
};
export default qualityService;
