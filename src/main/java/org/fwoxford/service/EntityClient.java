package org.fwoxford.service;
import com.fasterxml.jackson.core.JsonProcessingException;
import net.sf.json.JSONObject;
import org.springframework.http.*;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;
import java.util.Map;

/**
 * Created by gengluying on 2018/7/5.
 */
@Service
public class EntityClient extends AbstractMicroserviceClient<JSONObject> {
    public EntityClient(){
        super("misbbisquestion");
    }



    @Override
    public Collection<JSONObject> findAll() {
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.set("Authorization","Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfTUFOQUdFUixST0xFX1VTRVIiLCJleHAiOjE1MzMyODQ5NTl9.DeL8ExCYHVLu7KsFH52x1ySsc7ciDItoAB1ONbE-VTXAHAYF7Zv2TVxiP2SG4Pmn5LEFhIK4qhzguamhjvuHhA");
        String url = getUrl("questions");
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
        ResponseEntity<JSONObject[]> result = restTemplate.exchange(url,HttpMethod.GET,entity, JSONObject[].class);
        JSONObject[] str = result.getBody();
        return Arrays.asList(str);
    }

    @Override
    public JSONObject getOne(long id) {
        JSONObject jsonObject = restTemplate.getForObject(getUrl("authorization-records/", id),JSONObject.class);
        return jsonObject;
    }

    @Override
    public JSONObject findOne(long id, String url) {
        String uri = getUrl(url, id);
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.set("Authorization","Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfTUFOQUdFUixST0xFX1VTRVIiLCJleHAiOjE1MzMyODQ5NTl9.DeL8ExCYHVLu7KsFH52x1ySsc7ciDItoAB1ONbE-VTXAHAYF7Zv2TVxiP2SG4Pmn5LEFhIK4qhzguamhjvuHhA");
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
        ResponseEntity<JSONObject> responseEntity = restTemplate.exchange(uri,HttpMethod.GET,entity, JSONObject.class);
        return responseEntity.getBody();
    }

    @Override
    public JSONObject create(JSONObject object) throws JsonProcessingException {
        return null;
    }

    @Override
    public JSONObject update(JSONObject object) throws IOException {
        return null;
    }

    @Override
    public void delete(long id) {

    }
    @Override
    public JSONObject getEntity(JSONObject object) throws JsonProcessingException  {
       return null;
    }


    public JSONObject getEntity(String url, JSONObject object) throws JsonProcessingException {

        HttpEntity<String> entity = getJsonEntity(object);
        String uri = getUrl(url);
        ResponseEntity<JSONObject> responseEntity = restTemplate.exchange(uri,HttpMethod.POST,entity, JSONObject.class);

        return responseEntity.getBody();
    }

    public JSONObject queryOne(Long id, String url) {
        String uri = getUrl(url, id);
        JSONObject jsonObject = restTemplate.getForObject(uri,JSONObject.class);
        return jsonObject;
    }
}
