import React from 'react'
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

function BookForm({ initialContents, submitAction, buttonLabel = "Create" }) {

    const navigate = useNavigate();
    
    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialContents || {}, }
    );
    // Stryker enable all
   
    const testIdPrefix = "BookForm";

    return (

        <Form onSubmit={handleSubmit(submitAction)}>

            {initialContents && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="id">Id</Form.Label>
                    <Form.Control
                        data-testid={testIdPrefix + "-id"}
                        id="id"
                        type="text"
                        {...register("id")}
                        value={initialContents.id}
                        disabled
                    />
                </Form.Group>
            )}

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-name"}
                    id="name"
                    type="text"
                    isInvalid={Boolean(errors.name)}
                    {...register("name", {
                        required: "Name is required.",
                        maxLength : {
                            value: 30,
                            message: "Max length 30 characters"
                        }
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="author">Author</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-author"}
                    id="author"
                    type="text"
                    isInvalid={Boolean(errors.author)}
                    {...register("author", {
                        required: "Author is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.author?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="genre">Genre</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-genre"}
                    id="genre"
                    type="text"
                    isInvalid={Boolean(errors.genre)}
                    {...register("genre", {

                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.genre?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="word count">Word Count</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-wordcount"}
                    id="word count"
                    type="text"
                    isInvalid={Boolean(errors.wordcount)}
                    {...register("word count", {

                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.wordcount?.message}
                </Form.Control.Feedback>
            </Form.Group>


            <Button
                type="submit"
                data-testid={testIdPrefix + "-submit"}
            >
                {buttonLabel}
            </Button>
            <Button
                variant="Secondary"
                onClick={() => navigate(-1)}
                data-testid={testIdPrefix + "-cancel"}
            >
                Cancel
            </Button>

        </Form>

    )
}

export default BookForm;