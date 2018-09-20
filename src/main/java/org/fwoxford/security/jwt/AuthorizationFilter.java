package org.fwoxford.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import net.sf.json.JSONObject;
import org.fwoxford.web.rest.errors.InvalidAuthorizationException;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.URLDecoder;

/**
 * Filters incoming requests and installs a Spring Security principal if a header corresponding to a valid user is
 * found.
 */
public class AuthorizationFilter extends GenericFilterBean {

    private TokenProvider tokenProvider;

    public AuthorizationFilter(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    /**
     * 1.token 验证失效
     * 2.地址与授权项的验证
        获取当前访问链接，是否等于授权的HttpUrl
     * @param servletRequest
     * @param servletResponse
     * @param filterChain
     * @throws IOException
     * @throws ServletException
     */
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
        throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        String jwt = resolveToken(httpServletRequest);
        if(StringUtils.hasText(jwt) && this.tokenProvider.validateToken(jwt)){
            String httpUrl = httpServletRequest.getHeader("referer_full");
//            Cookie[] cookies = httpServletRequest.getCookies();
//            if(cookies==null){
//                throw new InvalidAuthorizationException("授权失败，请联系系统管理员！");
//            }
//            for(Cookie cookie :cookies){
//                switch (cookie.getName()){
//                    case "referer_full":
//                        httpUrl = URLDecoder.decode(cookie.getValue());
//                        break;
//                    default:
//                        break;
//                }
//            }
            if(httpUrl == null){
                throw new InvalidAuthorizationException("授权失败，请联系系统管理员！");
            }else{
                httpUrl = URLDecoder.decode(httpUrl);
                String secretKey =  tokenProvider.getSecretKey();
                Claims claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(jwt)
                    .getBody();
                Object authId = claims.get("authId");
                if(authId == null){
                    throw new InvalidAuthorizationException("授权失败，请联系系统管理员！");
                }
                JSONObject jsonObject = tokenProvider.queryOne(Long.valueOf(authId.toString()),"authorization-records", jwt);
                String authHttpUrl  = jsonObject.getString("httpUrl");
                if(!authHttpUrl.equals(httpUrl)){
                    throw new InvalidAuthorizationException("授权失败，请联系系统管理员！");
                }
            }
        }
        filterChain.doFilter(servletRequest, servletResponse);
    }

    private String resolveToken(HttpServletRequest request){
        String bearerToken = request.getHeader(JWTConfigurer.AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }
}
