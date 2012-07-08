package com.socialcomputing.corporama.services;

import java.util.Iterator;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.node.ArrayNode;

import com.socialcomputing.wps.server.planDictionnary.connectors.datastore.Attribute;
import com.socialcomputing.wps.server.planDictionnary.connectors.datastore.Entity;
import com.socialcomputing.wps.server.planDictionnary.connectors.datastore.StoreHelper;
import com.socialcomputing.wps.server.planDictionnary.connectors.utils.UrlHelper;

@Path("/")
public class RestProvider {

    private static final ObjectMapper mapper = new ObjectMapper();
    /*private static final String[] QueryParams = {
               "v", "key", "user",
               "q","f-zip","f-region","f-section","f-status_group","f-status_detail","f-head_count_slice",
               "f-revenue_slice","f-creation_date_slice","f-capital_slice","q-filters"
    };*/
    
    @POST
    @Path("maps/map.json")
    @Consumes("application/x-www-form-urlencoded")
    @Produces(MediaType.APPLICATION_JSON)
    public String kind(@Context HttpServletRequest request, 
                                           @FormParam("v") String v, 
                                           @FormParam("key") String key,
                                           @FormParam("user") String user, 
                                           @FormParam("query") String query) 
    {
        HttpSession session = request.getSession(true);
        String k = "";
        String result = null;//( String)session.getAttribute( k);
        if (result == null || result.length() == 0) {
            try {
                result = extract( v, key, user, query);
                //session.setAttribute( k, result);
            }
            catch (Exception e) {
                result = StoreHelper.ErrorToJson(e);
            }
        }
        return result;
    }
    
    private String extract( String v, String key, String user, String query) throws Exception {
        StoreHelper storeHelper = new StoreHelper();
        UrlHelper corporama = new UrlHelper( "http://corporama.com/api/prospect" + query);
        corporama.addParameter("v", v);
        corporama.addParameter("key", key);
        corporama.addParameter("user", user);
        corporama.openConnections();
        JsonNode nodes = mapper.readTree(corporama.getStream()).get("response").get("results").get("companies");
        for (JsonNode node : (ArrayNode) nodes) {
            Attribute att = storeHelper.addAttribute(node.get("siren").getTextValue());
            att.addProperty("name", node.get("name").getTextValue());
        
            JsonNode words = node.get("words");
            Iterator<String> it = words.getFieldNames(); 
            while( it.hasNext()) {
                Entity ent = storeHelper.addEntity(it.next());
                ent.addProperty("name", ent.getId());
                ent.addAttribute( att, words.get(ent.getId()).getLongValue());
            }
        }
        corporama.closeConnections();
        return storeHelper.toJson();
    }
    
    /*
    @Path("image-proxy")
    @Produces("image/*")
    public Response getThumbnail( @HeaderParam("Accept-Encoding") String encoding, @HeaderParam("If-Modified-Since") String cache, @HeaderParam("If-Modified-Since") String modified, @HeaderParam("If-None-Match") String match, @QueryParam("url") String url) {
        UrlHelper urlHelper = new UrlHelper( url);
        try {
            urlHelper.addHeader( "Accept-Encoding", encoding);
            urlHelper.addHeader( "If-Modified-Since", modified);
            urlHelper.addHeader( "If-None-Match", match);
            urlHelper.addHeader( "Cache-Control", cache);
            urlHelper.openConnections();
            HttpURLConnection connection = (HttpURLConnection) urlHelper.getConnection();
            String tag = connection.getHeaderField( "Etag");
            if( tag == null) tag = "";
            if( tag.startsWith("\"")) tag = tag.substring( 1);
            if( tag.endsWith("\"")) tag = tag.substring( 0, tag.length()-1);
            return Response.ok( urlHelper.getStream(), urlHelper.getContentType())
                .lastModified( new Date( connection.getLastModified()))
                .tag( tag)
                .status( connection.getResponseCode())
                .header( "Content-Length", connection.getContentLength())
                .build();
        }
        catch (Exception e) {
            Response.status( Responses.NOT_FOUND);
        }
        return null;
    }
*/
}
