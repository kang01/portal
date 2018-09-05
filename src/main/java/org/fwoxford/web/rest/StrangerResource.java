package org.fwoxford.web.rest;

import ch.qos.logback.core.util.TimeUtil;
import com.codahale.metrics.annotation.Timed;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.github.jhipster.web.util.ResponseUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import net.sf.json.JSONObject;
import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;
import org.fwoxford.config.Constants;
import org.fwoxford.service.EntityClient;
import org.fwoxford.domain.User;
import org.fwoxford.repository.UserRepository;
import org.fwoxford.security.AuthoritiesConstants;
import org.fwoxford.security.jwt.JWTConfigurer;
import org.fwoxford.security.jwt.TokenProvider;
import org.fwoxford.service.UserService;
import org.fwoxford.service.dto.StrangerDTO;
import org.fwoxford.service.dto.UserDTO;
import org.fwoxford.web.rest.errors.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.net.URISyntaxException;
import java.net.URLDecoder;
import java.time.ZonedDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/stranger")
public class StrangerResource {

    private final Logger log = LoggerFactory.getLogger(StrangerResource.class);

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Autowired
    TokenProvider tokenProvider;

    @Autowired
    AuthenticationManager authenticationManager;

    @Inject
    EntityClient entityClient;
    /**
     * POST  /users  : Creates a new user.
     * <p>
     * Creates a new user if the login and email are not already used, and sends an
     * mail with an activation link.
     * The user needs to be activated on creation.
     *  陌生人登陆验证
     *  （1）用邮箱，授权码，HttpUrl 验证是否有效存在
     *  （2）若存在且User不存在，生成一个User
     *  （3）成功后，生成idToken，和发送ID，返回
     * @param strangerDTO the user to create
     * @return the ResponseEntity with status 201 (Created) and with body the new user, or with status 400 (Bad Request) if the login or email is already in use
     * @throws URISyntaxException if the Location URI syntax is incorrect
     * @throws BadRequestAlertException 400 (Bad Request) if the login or email is already in use
     */
    @PostMapping("/login")
    @Timed
//    @Secured(AuthoritiesConstants.ANSWER)
    public ResponseEntity<StrangerDTO> createUser(@Valid @RequestBody StrangerDTO strangerDTO, HttpServletRequest request) throws URISyntaxException, JsonProcessingException {
        log.debug("REST request to check strangerDTO : {}", strangerDTO);
        //用邮箱，授权码，HttpUrl ，问题编码 验证是否有效存在
        String httpUrlFromCookie = request.getHeader("referer_full");
//        Cookie[] cookies = request.getCookies();
//        if (cookies == null || cookies.length == 0){
//            httpUrlFromCookie = null
//        } else {
//            for(Cookie cookie :cookies){
//                switch (cookie.getName()){
//                    case "referer_full":
//                        httpUrlFromCookie = cookie.getValue();
//                        break;
//                    default:
//                        break;
//                }
//            }
//        }

        if(httpUrlFromCookie == null){
            throw new InvalidAuthorizationException("获取授权信息失败，请重新点击链接登陆！");
        }
        JSONObject jsonObject = JSONObject.fromObject(strangerDTO);
        httpUrlFromCookie = URLDecoder.decode(httpUrlFromCookie);
        strangerDTO.setHttpUrl(httpUrlFromCookie);
        JSONObject strangerDTOs = entityClient.getEntity("authorization-records/entity",jsonObject);
        if(strangerDTOs==null || strangerDTOs.size()==0){
            throw new InvalidAuthorizationException("授权失败，请联系系统管理员！");
        }
        //判断是否过期---获取过期时间
        String expirationTime = strangerDTOs.getString("expirationTime");
        ZonedDateTime date = ZonedDateTime.parse(expirationTime);
        if(date.isBefore(ZonedDateTime.now())){
            throw new InvalidAuthorizationException("授权已过期，请联系系统管理员！");
        }
        Long authId = strangerDTOs.getLong("id");
        Long sendRecordId = strangerDTOs.getLong("sendRecordId");
        String name = strangerDTOs.getString("strangerName");
        String strangerName = ToPinyin(name);
        strangerName = strangerName+strangerDTO.getAuthorizationCode();
        //验证是否已经生成User,无，则生成User
        User existingUser =  userRepository.findOneByEmailAndRegisterSource(strangerDTO.getStrangerEmail(), Constants.REGISTER_SOURCE_STRANGER);
        //验证username是否已经存在，如果存在 new 一个新的user
        User user = userRepository.findOneByLogin(strangerName).orElse(null);
        if(user!=null){
            strangerName = strangerDTO.getStrangerEmail();
        }
        if(existingUser==null){
            UserDTO userDTO = new UserDTO();
            userDTO.setEmail(strangerDTO.getStrangerEmail());
            userDTO.setLogin(strangerName);

            Set<String> authorities = new HashSet<>();
            authorities.add(AuthoritiesConstants.ANSWER);
            userDTO.setAuthorities(authorities);
            userDTO.setAuthCode("user");
            existingUser = userService.createUser(userDTO);
        }

        //生成jwt
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(existingUser.getLogin(), "user");
        Authentication authentication = this.authenticationManager.authenticate(authenticationToken);

        String jwt = tokenProvider.createTokenWithParams(authentication, false,authId);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JWTConfigurer.AUTHORIZATION_HEADER, "Bearer " + jwt);
        strangerDTO.setIdToken("Bearer " + jwt);
        strangerDTO.setSendRecordId(sendRecordId);
        strangerDTO.setHttpUrl(httpUrlFromCookie);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(strangerDTO));
    }

    /**
     * 将中文字转成拼音
     * @param chinese
     * @return
     */
    public static String ToPinyin(String chinese){
        String pinyinStr = "";
        char[] newChar = chinese.toCharArray();
        HanyuPinyinOutputFormat defaultFormat = new HanyuPinyinOutputFormat();
        defaultFormat.setCaseType(HanyuPinyinCaseType.LOWERCASE);
        defaultFormat.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
        for(int i = 0;i<newChar.length;i++){
            if(newChar[i] > 128){
                try {
                    pinyinStr += PinyinHelper.toHanyuPinyinStringArray(newChar[i],defaultFormat)[0];
                } catch (BadHanyuPinyinOutputFormatCombination badHanyuPinyinOutputFormatCombination) {
                    badHanyuPinyinOutputFormatCombination.printStackTrace();
                }
            }else{
                pinyinStr += newChar[i];
            }
        }
        return pinyinStr;
    }
}
