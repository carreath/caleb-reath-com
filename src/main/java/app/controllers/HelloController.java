package app.controllers;

import app.models.authentication.User;
import app.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

/**
 * @author Caleb Reath
 * Date: 2017-07-27
 *
 * Example Controller
 */
@RestController
public class HelloController {

    @Autowired
    private UserService userService;

    @RequestMapping("/")
    public List<User> index() {
        return userService.getAllUsers();
    }

    @RequestMapping(value = "/", method = { RequestMethod.POST })
    public String createUser(@RequestBody @Valid User user) {
        userService.addUser(user);
        return "User Created";
    }
}