package app.producers.authentication;

import app.models.authentication.User;
import app.services.UserService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

/**
 * Created by carre on 2017-08-10.
 */
@Component
public class UserProducer {
    private Log logger = LogFactory.getLog(UserProducer.class);

    private UserService userService;

    @Autowired
    public UserProducer(UserService userService) {
        this.userService = userService;
    }

    @PostConstruct
    public void produceData() {
        addOneUser();
    }

    private void addOneUser() {
        logger.info("-> Adding new user now!");
        userService.addUser(new User("Ganonman101", "1234"));
    }
}
