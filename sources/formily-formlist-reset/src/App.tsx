import React from "react";
import { Button, Input, Space, Form, Divider } from "antd";

type AnyObj = Record<string, any>;
const FormGroup = () => {
  const [form] = Form.useForm();
  return (
    <Form form={form} style={{ width: 600 }}>
      <Form.List name={"lists1"} initialValue={[]}>
        {(fields1, { add: onAdd1 }) => (
          <div style={{ marginTop: 30, marginLeft: 30 }}>
            {fields1.map((item1: AnyObj, index1: number) => (
              <div key={index1}>
                <Form.List
                  name={[index1, "list2"]}
                  key={index1}
                  initialValue={[]}
                >
                  {(fields2, { add: onAdd2 }) => (
                    <div style={{ marginTop: 30, marginLeft: 30 }}>
                      {fields2.map((item2: AnyObj, index2: number) => (
                        <React.Fragment key={index2}>
                          <Form.Item
                            label={`${index1}-${index2}`}
                            name={[index2, "field"]}
                            initialValue="无"
                          >
                            <Input style={{ width: 300 }} />
                          </Form.Item>
                        </React.Fragment>
                      ))}
                      <Button
                        onClick={() =>
                          onAdd2({ field: `${index1}-${fields2.length}` })
                        }
                        style={{ marginTop: 10 }}
                      >
                        Add2
                      </Button>
                    </div>
                  )}
                </Form.List>
                <Divider />
              </div>
            ))}
            <Button
              block
              onClick={() => onAdd1()}
              style={{ marginTop: 10 }}
            >
              Add1
            </Button>
          </div>
        )}
      </Form.List>
      <br />
      <Space size={20}>
        <Button
          type="primary"
          onClick={() => {
            form.validateFields().then(console.log);
          }}
        >
          Submit
        </Button>
        <Button
          onClick={() => {
            form.resetFields();
          }}
        >
          Reset
        </Button>
      </Space>
    </Form>
  );
};

export default FormGroup;
