import React from "react";
import {
  Form,
  FieldList,
  FormItem,
  createAsyncFormActions
} from "@formily/antd";
import { Button, Input, Space } from "antd";
import type { IFormAsyncActions } from "@formily/antd";

const actions: IFormAsyncActions = createAsyncFormActions();

type AnyObj = Record<string, any>;
const FormGroup = () => {
  return (
    <Form actions={actions} style={{ width: 600 }}>
      <FieldList initialValue={[]} name="lists1">
        {({ state: state1, mutators: { push: onAdd1 } }) => (
          <div style={{ marginTop: 30, marginLeft: 30 }}>
            {state1.value.map((item1: AnyObj, index1: number) => (
              <FieldList
                initialValue={[]}
                name={`lists1.${index1}.list2`}
                key={index1}
              >
                {({ state: state2, mutators: { push: onAdd2 } }) => (
                  <div style={{ marginTop: 30, marginLeft: 30 }}>
                    {state2.value.map((item2: AnyObj, index2: number) => (
                      <React.Fragment key={index2}>
                        <FormItem
                          label={`${index1}-${index2}`}
                          name={`lists1.${index1}.list2.${index2}.field`}
                          component={Input}
                          style={{ width: 300 }}
                        />
                      </React.Fragment>
                    ))}
                    <Button
                      onClick={() =>
                        onAdd2({ field: `${index1}-${state2.value.length}` })
                      }
                      style={{ marginTop: 10 }}
                    >
                      Add2
                    </Button>
                  </div>
                )}
              </FieldList>
            ))}
            <Button block onClick={() => onAdd1()} style={{ marginTop: 10 }}>
              Add1
            </Button>
          </div>
        )}
      </FieldList>
      <br />
      <Space size={20}>
        <Button
          type="primary"
          onClick={() => {
            actions.submit((values) => {
              console.log(values);
            });
          }}
        >
          Submit
        </Button>
        <Button
          onClick={() => {
            actions.reset({ forceClear: true });
            // actions.reset({ forceClear: true, clearInitialValue: true })
          }}
        >
          Reset
        </Button>
      </Space>
    </Form>
  );
};

export default FormGroup;
