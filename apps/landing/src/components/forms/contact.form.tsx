import { useForm } from '@tanstack/react-form'

import { Send } from 'lucide-react'
import { toast } from 'sonner'

import { usePageTranslation } from '@/lib/hooks'

import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { InputGroup } from '../ui/input-group/InputGroup'
import { InputGroupAddon } from '../ui/input-group/InputGroupAddon'
import { InputGroupText } from '../ui/input-group/InputGroupText'
import { InputGroupTextarea } from '../ui/input-group/InputGroupTextarea'
import { Spinner } from '../ui/spinner'
import { createContactSchema } from './contact.schema'
import { useContactMe } from './contact.service'

const ContactForm = () => {
  const { t } = usePageTranslation('forms')

  const formSchema = createContactSchema(t)

  const contactMeMutation = useContactMe({
    onSuccess: () => {
      toast.success(t('contact.notifications.success.title'), {
        description: t('contact.notifications.success.description')
      })
      form.reset()
    },
    onError: (error) => {
      toast.warning(t('contact.notifications.warning.title'), {
        description: t('contact.notifications.warning.description')
      })
      console.error('Failed to send email:', error)
    }
  })

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    },
    validators: {
      onChange: formSchema,
      onSubmit: formSchema
    },
    onSubmit: ({ value }) => {
      try {
        contactMeMutation.mutate(value)
      } catch (error) {
        toast.error(t('contact.notifications.error.title'), {
          description: t('contact.notifications.error.description')
        })
        console.error('Unexpected error:', error)
      }
    }
  })

  return (
    <Card className="w-full relative">
      <CardHeader>
        <CardTitle id="contact-form-title">{t('contact.title')}</CardTitle>
        <CardDescription id="contact-form-description">{t('contact.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="contact-form"
          aria-labelledby="contact-form-title"
          aria-describedby="contact-form-description"
          noValidate
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}>
          <FieldGroup role="group" aria-label={t('contact.form_fields_aria')}>
            <Field className="gap-3 flex-col sm:flex-row items-start" orientation="horizontal">
              <form.Field name="name">
                {(field) => {
                  const isInvalid = field.state.meta.isBlurred && !field.state.meta.isValid
                  const errorId = `${field.name}-error`
                  const helpId = `${field.name}-help`

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name} className="flex items-end">
                        {t('contact.fields.name.label')}
                        <span className="text-muted-foreground text-xs font-normal h-fit">
                          {t('contact.required_label')}
                        </span>
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        aria-describedby={isInvalid ? `${helpId} ${errorId}` : helpId}
                        aria-required="true"
                        placeholder={t('contact.fields.name.placeholder')}
                        autoComplete="name"
                        required
                      />
                      <div id={helpId} className="sr-only max-w-full">
                        {t('contact.fields.name.help_text')}
                      </div>
                      {isInvalid && (
                        <FieldError id={errorId} errors={field.state.meta.errors} role="alert" />
                      )}
                    </Field>
                  )
                }}
              </form.Field>
              <form.Field name="email">
                {(field) => {
                  const isInvalid = field.state.meta.isBlurred && !field.state.meta.isValid
                  const errorId = `${field.name}-error`
                  const helpId = `${field.name}-help`

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name} className="flex items-end">
                        {t('contact.fields.email.label')}
                        <span className="text-muted-foreground text-xs font-normal h-fit">
                          {t('contact.required_label')}
                        </span>
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        aria-describedby={isInvalid ? `${helpId} ${errorId}` : helpId}
                        aria-required="true"
                        placeholder={t('contact.fields.email.placeholder')}
                        autoComplete="email"
                        required
                      />
                      <div id={helpId} className="sr-only max-w-full">
                        {t('contact.fields.email.help_text')}
                      </div>
                      {isInvalid && (
                        <FieldError id={errorId} errors={field.state.meta.errors} role="alert" />
                      )}
                    </Field>
                  )
                }}
              </form.Field>
            </Field>
            <form.Field name="subject">
              {(field) => {
                const isInvalid = field.state.meta.isBlurred && !field.state.meta.isValid
                const errorId = `${field.name}-error`
                const helpId = `${field.name}-help`

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} className="flex items-end">
                      {t('contact.fields.subject.label')}
                      <span className="text-muted-foreground text-xs font-normal h-fit">
                        {t('contact.required_label')}
                      </span>
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      aria-describedby={isInvalid ? `${helpId} ${errorId}` : helpId}
                      aria-required="true"
                      placeholder={t('contact.fields.subject.placeholder')}
                      autoComplete="off"
                      required
                    />
                    <div id={helpId} className="sr-only max-w-full">
                      {t('contact.fields.subject.help_text')}
                    </div>
                    {isInvalid && (
                      <FieldError id={errorId} errors={field.state.meta.errors} role="alert" />
                    )}
                  </Field>
                )
              }}
            </form.Field>
            <form.Field name="message">
              {(field) => {
                const isInvalid = field.state.meta.isBlurred && !field.state.meta.isValid
                const errorId = `${field.name}-error`
                const helpId = `${field.name}-help`
                const charCountId = `${field.name}-char-count`

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} className="flex items-end">
                      {t('contact.fields.message.label')}
                      <span className="text-muted-foreground text-xs font-normal h-fit">
                        {t('contact.required_label')}
                      </span>
                    </FieldLabel>
                    <InputGroup className="bg-transparent!">
                      <InputGroupTextarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder={t('contact.fields.message.placeholder')}
                        rows={6}
                        className="min-h-24 resize-none bg-transparent"
                        aria-invalid={isInvalid}
                        aria-describedby={
                          isInvalid
                            ? `${helpId} ${charCountId} ${errorId}`
                            : `${helpId} ${charCountId}`
                        }
                        aria-required="true"
                        maxLength={600}
                        required
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText
                          id={charCountId}
                          className="tabular-nums"
                          aria-live="polite"
                          aria-label={t('contact.fields.message.character_count_aria', {
                            count: field.state.value.length,
                            max: 600
                          })}>
                          {t('contact.fields.message.character_count', {
                            count: field.state.value.length
                          })}
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    <div id={helpId} className="sr-only max-w-full">
                      {t('contact.fields.message.help_text')}
                    </div>
                    {isInvalid && (
                      <FieldError id={errorId} errors={field.state.meta.errors} role="alert" />
                    )}
                  </Field>
                )
              }}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <form.Subscribe
          selector={(state) =>
            state.canSubmit && Object.values(state.values).every((v) => v.trim().length > 0)
          }>
          {(canSubmit) => (
            <Button
              className="w-full"
              type="submit"
              form="contact-form"
              disabled={!canSubmit || contactMeMutation.isPending}
              aria-describedby="submit-button-help">
              {contactMeMutation.isPending ? (
                <>
                  {t('contact.submitting_button')}
                  <Spinner />
                </>
              ) : (
                <>
                  {t('contact.submit_button')}
                  <Send className="size-4" aria-hidden="true" />
                </>
              )}
            </Button>
          )}
        </form.Subscribe>

        <div id="submit-button-help" className="sr-only max-w-full">
          {t('contact.submit_button_help')}
        </div>
      </CardFooter>
    </Card>
  )
}

export { ContactForm }
