package com.socialcomputing.corporama.services;

import java.util.Iterator;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.node.ArrayNode;

import com.socialcomputing.wps.server.planDictionnary.connectors.JMIException;
import com.socialcomputing.wps.server.planDictionnary.connectors.datastore.Attribute;
import com.socialcomputing.wps.server.planDictionnary.connectors.datastore.Entity;
import com.socialcomputing.wps.server.planDictionnary.connectors.datastore.StoreHelper;
import com.socialcomputing.wps.server.planDictionnary.connectors.utils.UrlHelper;

@Path("/")
public class RestProvider {

    private static final ObjectMapper mapper = new ObjectMapper();
    
    @GET
    @Path("maps/map.json")
    @Produces(MediaType.APPLICATION_JSON)
    public String kind(@Context HttpServletRequest request, @QueryParam("query") String query) {
        HttpSession session = request.getSession(true);
        String key = query;
        String result = null;//( String)session.getAttribute( key);
        if (result == null || result.length() == 0) {
            try {
                result = extract(query);
                //session.setAttribute( key, result);
            }
            catch (Exception e) {
                result = StoreHelper.ErrorToJson(e);
            }
        }
        return result;
    }
    
    private String extract(String query) throws Exception {
        StoreHelper storeHelper = new StoreHelper();
        UrlHelper urlNodes = new UrlHelper( "http://corporama.com/api/prospect?v=1.0&key=Y29ycG9fcGFydG&user=social_computing&f-region=98&q=&exec=1&q-filters=word&q-filters=naf&q-filters=company_name");
        //urlNodes.addParameter( "param1", "value1");
        //urlNodes.addParameter( "param2", "value2");
        urlNodes.openConnections();
        JsonNode nodes = mapper.readTree(urlNodes.getStream()).get("response").get("results").get("companies");
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
        urlNodes.closeConnections();
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
