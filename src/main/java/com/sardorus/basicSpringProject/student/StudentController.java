package com.sardorus.basicSpringProject.student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@RestController
@RequestMapping(path = "/student")
public class StudentController {

    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService){
        this.studentService = studentService;
    }

    @GetMapping(path = "/getAllStudents")
    public String getStudents(Model model){
        model.addAttribute("studentList", studentService.getStudents());
        return "students";
    }

    @GetMapping(path = "/{studentId}")
    public String getStudentById(Model model, @PathVariable("studentId") Long id){
        model.addAttribute("studentList", studentService.getStudentById(id));
        return "students";
    }

    @PostMapping(path = "/register")
    public String registerNewStudent(@RequestBody Student student){
        studentService.addNewStudent(student);
        return "students";
    }

    @DeleteMapping(path = "/delete/{studentId}")
    public String deleteStudent(@PathVariable("studentId") Long id){
        studentService.deleteStudent(id);
        return "students";
    }

    @PutMapping(path = "/edit/{studentId}")
    public String updateStudent(
            @PathVariable("studentId") Long studentId,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email){
        studentService.updateStudent(studentId, name, email);
        return "students";
    }

}
