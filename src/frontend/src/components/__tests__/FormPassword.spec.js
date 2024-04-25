/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import FormPassword from '../forms/FormPassword.vue'
import FormInput from '../FormInput.vue';
import FormButton from '../FormButton.vue';

describe('FormPassword', () => {
  const wrapper = mount(FormPassword, {
    global: {
      components: {
        FormInput,
        FormButton
      }
    }
  });

  it('should validate password is empty', async () => {
    await wrapper.find('form').trigger('submit');
    expect(wrapper.html()).toContain('Sua senha deve conter 8 dígitos, com pelo menos 1 número, 1 letra minúscula e 1 letra maiúscula.');
  })

  it('should validate password pattern', async () => {
    await wrapper.find('#password').setValue('102030');
    await wrapper.find('form').trigger('submit');
    expect(wrapper.html()).toContain('Sua senha deve conter 8 dígitos, com pelo menos 1 número, 1 letra minúscula e 1 letra maiúscula.');

    await wrapper.find('#password').setValue('102030@');
    await wrapper.find('form').trigger('submit');
    expect(wrapper.html()).toContain('Sua senha deve conter 8 dígitos, com pelo menos 1 número, 1 letra minúscula e 1 letra maiúscula.');

    await wrapper.find('#password').setValue('102030@M');
    await wrapper.find('form').trigger('submit');
    expect(wrapper.html()).toContain('Sua senha deve conter 8 dígitos, com pelo menos 1 número, 1 letra minúscula e 1 letra maiúscula.');

    await wrapper.find('#password').setValue('102030@Ms');
    await wrapper.find('form').trigger('submit');
    expect(wrapper.html()).not.toContain('Sua senha deve conter 8 dígitos, com pelo menos 1 número, 1 letra minúscula e 1 letra maiúscula.');
  })
})
