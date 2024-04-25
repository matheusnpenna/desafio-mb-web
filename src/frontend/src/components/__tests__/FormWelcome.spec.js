/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import FormWelcome from '../forms/FormWelcome.vue'
import FormInput from '../FormInput.vue';
import FormButton from '../FormButton.vue';
import FormRadioGroup from '../FormRadioGroup.vue';
import FormRadio from '../FormRadio.vue';

describe('FormWelcome', () => {
  const wrapper = mount(FormWelcome, {
    global: {
      components: {
        FormInput,
        FormButton,
        FormRadioGroup,
        FormRadio
      }
    }
  });

  it('should validate e-mail field', async () => {
    await wrapper.find('form').trigger('submit');
    expect(wrapper.html()).toContain('Digite um e-mail válido');
  })

  it('should validate legal nature field', async () => {
    await wrapper.find('#email').setValue('test@test.com');
    await wrapper.find('form').trigger('submit');
    expect(wrapper.html()).toContain('Escolha o tipo de pessoa')
  })
})
